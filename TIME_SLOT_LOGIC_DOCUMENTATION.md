# Time Slot Logic Documentation

## Overview
This document describes the time slot and block-based scheduling system implemented for the Swim School Scheduler. The system uses a **block-based approach** with 20-minute blocks to prevent double-booking and manage instructor availability.

## Key Design Decisions

### 1. Block-Based System
- **Block Duration**: 20 minutes
- **Block Start Times**: :00, :20, :40 (e.g., 08:00, 08:20, 08:40)
- **Appointment Durations**: 1, 2, or 3 blocks (20, 40, or 60 minutes)
- **Operating Hours**: 8:00 AM to 8:00 PM (default)

### 2. Buffer Logic
- **5-minute buffer** is built into the system
- Buffer is applied **after** each appointment ends
- The last block of a multi-block appointment is **excluded** from conflict checking
- This allows the next appointment to start immediately after the previous one ends

### 3. Conflict Detection
- Uses block overlap detection rather than time range overlap
- Two appointments conflict if they share any reserved blocks
- Simpler and more predictable than time-based conflict detection

## Core Functions

### `generateBlockSlots(start, end)`
Generates all available 20-minute block start times for a day.

**Example:**
```typescript
generateBlockSlots('08:00', '09:00')
// Returns: ['08:00', '08:20', '08:40', '09:00']
```

**Key Implementation Details:**
- Increments by 20 minutes
- Handles full day (8:00 AM to 8:00 PM = 37 blocks)
- Returns array of HH:MM format strings

### `getAppointmentBlocks(start, blockCount)`
Determines which blocks are occupied by an appointment.

**Critical Behavior:**
- For 1-block appointment: Returns `['10:00']`
- For 2-block appointment: Returns `['10:20']` (excludes last block)
- For 3-block appointment: Returns `['11:00', '11:20']` (excludes last block)

**Why exclude the last block?**
- The last block is only occupied up to the end time minus buffer
- This allows the next appointment to start at the next block boundary
- Example: 11:00-12:00 (3 blocks) reserves `['11:00', '11:20']`, making 11:40 available for next appointment

**Examples:**
```typescript
getAppointmentBlocks('10:00', 1)  // ['10:00']
getAppointmentBlocks('10:20', 2)  // ['10:20'] (not ['10:20', '10:40'])
getAppointmentBlocks('11:00', 3)  // ['11:00', '11:20'] (not ['11:00', '11:20', '11:40'])
```

### `checkBlockConflict(blocksA, blocksB)`
Checks if two sets of blocks overlap.

**Logic:**
- Returns `true` if any block in blocksA exists in blocksB
- Simple array intersection check

**Examples:**
```typescript
checkBlockConflict(['11:00', '11:20'], ['11:40'])  // false (no overlap)
checkBlockConflict(['11:00', '11:20'], ['11:20'])   // true (overlap at 11:20)
```

### `validateInstructorAvailability(requestedBlocks, occupiedBlocks)`
Validates that all requested blocks are available for an instructor.

**Logic:**
- Checks that none of the requested blocks are in the occupied blocks list
- Returns `true` only if ALL requested blocks are available

**Example:**
```typescript
validateInstructorAvailability(['10:00', '10:20'], ['09:40', '10:00'])
// Returns: false (10:00 is already occupied)
```

## Supporting Functions

### `generateTimeSlots(start, end, increment)`
Generates time slots with custom increments (used for 15-minute slot display).

**Example:**
```typescript
generateTimeSlots('08:00', '20:00', 15)
// Returns 49 slots (12 hours * 4 + 1)
```

### `checkTimeOverlap(startA, endA, startB, endB, buffer)`
Checks if two time ranges overlap, applying buffer after each appointment.

**Key Features:**
- Handles overnight ranges (spanning midnight)
- Buffer is applied only after appointments end
- Used by `getAvailableSlots` for filtering available slots

### `getAvailableSlots(slots, bookings, buffer)`
Filters out slots that overlap with existing bookings (with buffer).

**Use Case:**
- Used for displaying available appointment times
- Filters 15-minute increment slots based on existing bookings

### `formatTimeDisplay(time)`
Converts 24-hour format to 12-hour AM/PM format for display.

**Example:**
```typescript
formatTimeDisplay('13:15')  // '1:15 PM'
formatTimeDisplay('00:00')  // '12:00 AM'
```

### `validateAppointmentTime(date, open, close)`
Validates that an appointment time is:
- In the future
- Within business hours (open to close)

### `parseTimeString(time)`
Converts HH:MM string to Date object (today's date).

## Business Rules

### Appointment Scheduling Rules
1. **Block Alignment**: Appointments must start at block boundaries (:00, :20, :40)
2. **Duration Options**: 1, 2, or 3 blocks (20, 40, or 60 minutes)
3. **Double-Booking Prevention**: Uses block overlap detection
4. **Buffer Handling**: 5-minute buffer built into block logic (not visible to users)

### Time Slot Display Rules
1. **15-Minute Increments**: UI can display slots in 15-minute increments
2. **20-Minute Blocks**: Actual scheduling uses 20-minute blocks
3. **Availability**: Slots are filtered based on instructor's occupied blocks

## Test Coverage

All functions have comprehensive test coverage in `timeSlots.test.ts`:

- ✅ `generateTimeSlots`: 15-minute increments, overnight handling
- ✅ `getAvailableSlots`: Buffer exclusion, empty bookings
- ✅ `formatTimeDisplay`: 12-hour conversion, edge cases
- ✅ `validateAppointmentTime`: Future dates, business hours
- ✅ `parseTimeString`: Date conversion, invalid format handling
- ✅ `generateBlockSlots`: Full day generation, custom ranges
- ✅ `getAppointmentBlocks`: 1/2/3 block appointments, last block exclusion
- ✅ `checkBlockConflict`: Overlap detection, no overlap cases
- ✅ `validateInstructorAvailability`: All blocks available check

## Integration with Firestore

The block-based system is integrated into `addAppointment` in `firestore.ts`:

```typescript
export async function addAppointment(data) {
  // Get existing appointments for instructor on same date
  const existing = await getAppointmentsByInstructor(data.instructorId, data.date);
  
  // Calculate requested blocks
  const requestedBlocks = getAppointmentBlocks(data.startTime, data.blockCount);
  
  // Check for conflicts
  for (const appt of existing) {
    if (appt.blocks && checkBlockConflict(requestedBlocks, appt.blocks)) {
      throw new Error('Double booking');
    }
  }
  
  // Save appointment with blocks array
  await addDoc(collection(db, 'appointments'), {
    ...data,
    blocks: requestedBlocks,  // Store reserved blocks
    createdAt: Timestamp.now(),
    status: 'scheduled',
  });
}
```

## Edge Cases Handled

1. **Overnight Ranges**: Functions handle time ranges spanning midnight
2. **Invalid Time Formats**: Validation and error handling for malformed times
3. **Boundary Conditions**: Start/end of day, exact block boundaries
4. **Empty States**: No bookings, no available slots
5. **Concurrent Bookings**: Block conflict detection prevents double-booking

## Future Considerations

- **Recurring Appointments**: System supports recurring appointments (see `generateRecurringAppointments` in firestore.ts)
- **Custom Block Sizes**: Currently fixed at 20 minutes, could be made configurable
- **Multiple Instructors**: Each instructor has independent block availability
- **Time Zone Handling**: Currently assumes local time zone

## Questions for Future Development

1. Should block size be configurable per instructor or globally?
2. Should buffer time be configurable or remain fixed at 5 minutes?
3. How should we handle appointments that don't align with block boundaries?
4. Should we add support for custom appointment durations beyond 1-3 blocks?

