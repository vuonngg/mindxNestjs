export class Class {
  private static readonly MINIMUM_STUDENTS = 20;
  private _status: ClassStatus;

  private constructor(
    private readonly _id: number,
    private _name: string,
    private _teacher: string,
    private _studentCount: number,
    private _startAt: Date,
    private _closeAt: Date,
    status: ClassStatus,
  ) {
    this.ensureDatesAreValid(_startAt, _closeAt);
    this.ensureStudentCountsAreValid(_studentCount);
    this.ensureTeacherInformation(_teacher);
    this._status = status;
  }

  static create(params: {
    name: string;
    teacher: string;
    studentCount?: number;
    startAt: Date;
    closeAt: Date;
  }): Class {
    return new Class(
      0,
      params.name,
      params.teacher,
      params.studentCount ?? 0,
      params.startAt,
      params.closeAt,
      ClassStatus.PREPARING,
    );
  }

  static reconstitute(params: {
    id: number;
    name: string;
    teacher: string;
    studentCount: number;
    startAt: Date;
    closeAt: Date;
    status: ClassStatus;
  }): Class {
    return new Class(
      params.id,
      params.name,
      params.teacher,
      params.studentCount,
      params.startAt,
      params.closeAt,
      params.status,
    );
  }

  requestOpen(): void {
    this.assertStatus(ClassStatus.PREPARING, 'Only classes in PREPARING can request to open');
    this._status = ClassStatus.OPEN_REQUEST;
  }

  approveOpen(currentDate: Date = new Date()): void {
    this.assertStatus(ClassStatus.OPEN_REQUEST, 'Only classes in OPEN_REQUEST can be approved');
    if (currentDate < this._startAt) {
      throw new Error('Cannot open class before start date');
    }
    if (this._studentCount < Class.MINIMUM_STUDENTS) {
      throw new Error(`Need at least ${Class.MINIMUM_STUDENTS} students to open the class`);
    }
    this._status = ClassStatus.OPEN;
  }

  pause(): void {
    this.assertStatus(ClassStatus.OPEN, 'Only classes in OPEN can be paused');
    this._status = ClassStatus.PENDING;
  }

  resume(currentDate: Date = new Date()): void {
    this.assertStatus(ClassStatus.PENDING, 'Only classes in PENDING can resume');
    if (currentDate > this._closeAt) {
      throw new Error('Cannot resume a class after its end date');
    }
    this._status = ClassStatus.OPEN;
  }

  finish(currentDate: Date = new Date()): void {
    if (![ClassStatus.OPEN, ClassStatus.PENDING].includes(this._status)) {
      throw new Error('Only OPEN or PENDING classes can be finished');
    }
    if (currentDate < this._startAt) {
      throw new Error('Cannot finish a class before it starts');
    }
    this._status = ClassStatus.FINISHED;
  }

  updateInformation(params: {
    name?: string;
    teacher?: string;
    startAt?: Date;
    closeAt?: Date;
  }): void {
    if (![ClassStatus.PREPARING, ClassStatus.PENDING].includes(this._status)) {
      throw new Error('Only PREPARING or PENDING classes can be updated');
    }
    if (params.name) {
      this._name = params.name;
    }
    if (params.teacher) {
      this.ensureTeacherInformation(params.teacher);
      this._teacher = params.teacher;
    }
    if (params.startAt || params.closeAt) {
      const newStart = params.startAt ?? this._startAt;
      const newClose = params.closeAt ?? this._closeAt;
      this.ensureDatesAreValid(newStart, newClose);
      this._startAt = newStart;
      this._closeAt = newClose;
    }
  }

  adjustStudentCount(delta: number): void {
    const newCount = this._studentCount + delta;
    if (newCount < 0) {
      throw new Error('Student count cannot be negative');
    }
    this._studentCount = newCount;
  }

  private ensureDatesAreValid(startAt: Date, closeAt: Date): void {
    if (startAt >= closeAt) {
      throw new Error('Start date must be before end date');
    }
  }

  private ensureStudentCountsAreValid(currentCount: number): void {
    if (currentCount < 0) {
      throw new Error('Current student count cannot be negative');
    }
  }

  private ensureTeacherInformation(teacher: string): void {
    if (!teacher || !teacher.trim()) {
      throw new Error('Teacher information is required');
    }
  }

  private assertStatus(expected: ClassStatus, message: string): void {
    if (this._status !== expected) {
      throw new Error(message);
    }
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get teacher(): string {
    return this._teacher;
  }

  get studentCount(): number {
    return this._studentCount;
  }

  get startAt(): Date {
    return this._startAt;
  }

  get closeAt(): Date {
    return this._closeAt;
  }

  get status(): ClassStatus {
    return this._status;
  }
}

export enum ClassStatus {
  NEW = 'NEW',
  PREPARING = 'PREPARING',
  PLANNING = 'PLANNING',
  OPEN_REQUEST = 'OPEN_REQUEST',
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  REJECTED = 'REJECTED',
}