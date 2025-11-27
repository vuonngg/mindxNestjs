// src/domain/entities/User.ts

export class User {
    private readonly _id: number;
    private _name: string;
    private _age: number;
    private _gender: string;


    protected constructor(id: number, name: string, age: number, gender: string) {
        this._id = id;
        this._name = name;
        this._age = age;
        this._gender = gender;
    }


    public static create(name: string, age: number, gender: string): User {
        // ID: Pass 0 hoặc null, ID thực sự sẽ được gán sau khi lưu vào DB (bởi Adapter)
        if (age < 18) {
            throw new Error('User must be at least 18 years old.'); // Logic Nghiệp vụ
        }
        return new User(0, name, age, gender);
    }

    /**
     * Reconstitute User từ database (đã có ID)
     * Dùng khi load User từ persistence layer
     */
    public static reconstitute(id: number, name: string, age: number, gender: string): User {
        return new User(id, name, age, gender);
    }
    

    public changeName(newName: string): void {
        if (!newName || newName.length < 3) {
            throw new Error('Name must be valid and longer than 3 characters.');
        }
        this._name = newName;
        // Có thể thêm logic bắn Domain Event tại đây
    }

    // 4. Getters (để truy cập dữ liệu an toàn từ bên ngoài Entity)
    public get id(): number { return this._id; }
    public get name(): string { return this._name; }
    public get age(): number { return this._age; }
    public get gender(): string { return this._gender; }
}