import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class programRepository {
  async create(program: Omit<Program, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into program (title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.category_id,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from program where id = ?",
      [id],
    );

    return rows[0] as Program;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from program");

    return rows as Program[];
  }

  async update(id: number, program: Omit<Program, "id">) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE program SET title = ?, synopsis = ?, poster = ?, country = ?, year = ?, category_id = ? WHERE id = ?",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.category_id,
        id,
      ],
    );

    return result.affectedRows > 0;
  }

  async updateTitle(id: number, title: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE program SET title = ? WHERE id = ?",
      [title, id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new programRepository();
