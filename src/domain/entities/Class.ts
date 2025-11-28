export class Class {
  private static readonly MINIMUM_STUDENTS = 20;
  private _status: ClassStatus;

  private constructor(
    private readonly _id: number,
    private _name: string,
    private _location: string,
    private _startAt: Date,
    private _closeAt: Date,
    private _teacher: string | null,
    private _studentCount: number,
    private _fromHour: number | null,
    private _toHour: number | null,
    status: ClassStatus,
  ) {
    this.ensureDatesAreValid(_startAt, _closeAt);
    this.ensureTeacherInformation(_teacher);
    this.ensureStudentCountsAreValid(_studentCount);
    this.ensureScheduleIsValid(_fromHour, _toHour);
    this._status = status;
  }

  static create(params: {
    name: string;
    location: string;
    startAt: Date;
    closeAt: Date;
  }): Class {
    return new Class(
      0,
      params.name,
      params.location,
      params.startAt,
      params.closeAt,
      null,
      0,
      null,
      null,
      ClassStatus.NEW,
    );
  }

  updateBasicInfo(params: {
    name?: string;
    location?: string;
    startAt?: Date;
    closeAt?: Date;
  }): void {
    if (params.name) {
      this._name = params.name;
    }
    if (params.location) {
      this._location = params.location;
    }
    if (params.startAt || params.closeAt) {
      const newStart = params.startAt ?? this._startAt;
      const newClose = params.closeAt ?? this._closeAt;
      this.ensureDatesAreValid(newStart, newClose);
      this._startAt = newStart;
      this._closeAt = newClose;
    }
  }

  static reconstitute(params: {
    id: number;
    name: string;
    location: string;
    startAt: Date;
    closeAt: Date;
    teacher: string | null;
    studentCount: number;
    fromHour: number | null;
    toHour: number | null;
    status: ClassStatus;
  }): Class {
    return new Class(
      params.id,
      params.name,
      params.location,
      params.startAt,
      params.closeAt,
      params.teacher,
      params.studentCount,
      params.fromHour,
      params.toHour,
      params.status,
    );
  }

  updateSchedule(fromHour: number, toHour: number): void {
    this.ensureScheduleIsValid(fromHour, toHour);
    if (fromHour >= toHour) {
      throw new Error('fromHour must be earlier than toHour');
    }
    this._fromHour = fromHour;
    this._toHour = toHour;
    if (this._status === ClassStatus.NEW) {
      this._status = ClassStatus.PREPARING;
    }
  }

  updateStudentCount(count: number): void {
    this.ensureStudentCountsAreValid(count);
    if (count < 0) {
      throw new Error('Student count cannot be negative');
    }
    this._studentCount = count;
    if (this._studentCount >= Class.MINIMUM_STUDENTS && this._status === ClassStatus.PREPARING) {
      this._status = ClassStatus.OPEN_REQUEST;
    }
  }

  assignTeacher(teacher: string): void {
    if (this._status !== ClassStatus.OPEN_REQUEST) {
      throw new Error('Teacher can only be assigned when class is in OPEN_REQUEST');
    }
    this.ensureTeacherInformation(teacher);
    this._teacher = teacher;
    this._status = ClassStatus.OPEN;
  }

  approveShortage(): void {
    if (this._status !== ClassStatus.PREPARING) {
      throw new Error('Only prepping classes can be manually approved');
    }
    this._status = ClassStatus.OPEN_REQUEST;
  }

  private ensureDatesAreValid(startAt: Date, closeAt: Date): void {
    if (startAt >= closeAt) {
      throw new Error('Thời gian bắt đầu không được lớn hơn thời gian kết thúc');
    }
  }

  private ensureStudentCountsAreValid(studentCount: number): void {
    if (studentCount < 0) {
      throw new Error('Student count cannot be negative');
    }
  }

  private ensureScheduleIsValid(fromHour: number | null, toHour: number | null): void {
    if (fromHour !== null && toHour !== null && fromHour >= toHour) {
      throw new Error('fromHour must be earlier than toHour');
    }
  }

  private ensureTeacherInformation(teacher: string | null): void {
    if (teacher !== null && !teacher.trim()) {
      throw new Error('Teacher information must be valid');
    }
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get location(): string {
    return this._location;
  }

  get startAt(): Date {
    return this._startAt;
  }

  get closeAt(): Date {
    return this._closeAt;
  }

  get teacher(): string | null {
    return this._teacher;
  }

  get studentCount(): number {
    return this._studentCount;
  }

  get fromHour(): number | null {
    return this._fromHour;
  }

  get toHour(): number | null {
    return this._toHour;
  }

  get status(): ClassStatus {
    return this._status;
  }
}
export enum ClassStatus {
  NEW = 'NEW',
  PREPARING = 'PREPARING',
  OPEN_REQUEST = 'OPEN_REQUEST',
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  REJECTED = 'REJECTED',
}