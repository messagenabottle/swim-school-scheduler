import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Instructor, Client, Appointment } from '../types';
import { getAppointmentBlocks, checkBlockConflict } from '../utils/timeSlots';

/**
 * Adds a new instructor to Firestore.
 * @param data - Instructor data (name required)
 * @returns The new instructor's ID
 * @throws Error if add fails
 */
export async function addInstructor(data: { name: string }): Promise<string> {
  if (!data.name || data.name.length < 2) throw new Error('Name required');
  const docRef = await addDoc(collection(db, 'instructors'), {
    name: data.name,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

/**
 * Gets all instructors from Firestore.
 * @returns Array of Instructor objects
 */
export async function getInstructors(): Promise<Instructor[]> {
  const snap = await getDocs(collection(db, 'instructors'));
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
}

/**
 * Adds a new client to Firestore.
 * @param data - Client data (name, email required)
 * @returns The new client's ID
 * @throws Error if validation fails
 */
export async function addClient(data: Partial<Client>): Promise<string> {
  if (!data.name || !data.email) throw new Error('Name and email required');
  const docRef = await addDoc(collection(db, 'clients'), {
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

/**
 * Gets all clients from Firestore.
 * @returns Array of Client objects
 */
export async function getClients(): Promise<Client[]> {
  const snap = await getDocs(collection(db, 'clients'));
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
}

/**
 * Adds an appointment, preventing double booking using block logic.
 * @param data - Appointment data (must include instructorId, startTime, blockCount)
 * @returns The new appointment's ID
 * @throws Error if double booking detected
 */
export async function addAppointment(data: Partial<Appointment> & { instructorId: string; startTime: string; blockCount: number }): Promise<string> {
  // Get existing appointments for instructor on the same date
  const existing = await getAppointmentsByInstructor(data.instructorId, data.date);
  const requestedBlocks = getAppointmentBlocks(data.startTime, data.blockCount);
  console.log('[addAppointment] data:', data);
  console.log('[addAppointment] requestedBlocks:', requestedBlocks);
  console.log('[addAppointment] existing:', existing);
  for (const appt of existing) {
    console.log('[addAppointment] checking appt.blocks:', appt.blocks);
    if (appt.blocks && checkBlockConflict(requestedBlocks, appt.blocks)) {
      console.log('[addAppointment] Double booking detected:', appt);
      throw new Error('Double booking');
    }
  }
  const docRef = await addDoc(collection(db, 'appointments'), {
    ...data,
    blocks: requestedBlocks,
    createdAt: Timestamp.now(),
    status: 'scheduled',
  });
  return docRef.id;
}

/**
 * Gets all appointments for a given date.
 * @param date - Date string (YYYY-MM-DD)
 * @returns Array of Appointment objects
 */
export async function getAppointmentsByDate(date: string): Promise<Appointment[]> {
  const snap = await getDocs(collection(db, 'appointments'));
  return snap.docs
    .map((d: any) => ({ id: d.id, ...d.data() }))
    .filter((a: any) => a.date === date);
}

/**
 * Gets all appointments for an instructor on a given date.
 * @param instructorId - Instructor ID
 * @param date - Date string (YYYY-MM-DD)
 * @returns Array of Appointment objects
 */
export async function getAppointmentsByInstructor(instructorId: string, date: string): Promise<Appointment[]> {
  const snap = await getDocs(collection(db, 'appointments'));
  const mapped = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
  console.log('[getAppointmentsByInstructor] instructorId:', instructorId, 'date:', date);
  console.log('[getAppointmentsByInstructor] mapped:', mapped);
  const filtered = mapped.filter((a: any) => a.instructorId === instructorId && a.date === date);
  console.log('[getAppointmentsByInstructor] filtered:', filtered);
  return filtered;
}

/**
 * Cancels an appointment by updating its status.
 * @param id - Appointment ID
 * @returns void
 */
export async function cancelAppointment(id: string): Promise<void> {
  await updateDoc(doc(db, 'appointments', id), { status: 'cancelled' });
}

/**
 * Generates a weekly recurring appointment series.
 * @param data - Recurring appointment data (startDate, occurrences, etc.)
 * @returns Array of created appointment IDs
 */
export async function generateRecurringAppointments(data: { instructorId: string; startTime: string; blockCount: number; startDate: string; occurrences: number }): Promise<string[]> {
  const ids: string[] = [];
  let date = new Date(data.startDate);
  for (let i = 0; i < data.occurrences; i++) {
    const apptData = {
      instructorId: data.instructorId,
      startTime: data.startTime,
      blockCount: data.blockCount,
      date: date.toISOString().slice(0, 10),
    };
    const id = await addAppointment(apptData);
    ids.push(id);
    date.setDate(date.getDate() + 7);
  }
  return ids;
} 