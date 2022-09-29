import pool from "../../db.js";
import removeSubstrings from "../../helpers/removeSubstrings.js";

class RequestController {
  async getNewId(req, res) {
    try {
      const response = await pool.query('SELECT * FROM last_issued_id');
      if (response.rows.length === 0) {
        res.json({ newId: 0 });
        await pool.query('INSERT INTO last_issued_id (id) VALUES ($1)', [0]);
      } else {
        const id = response.rows[0].id;
        const newId = id + 1;
        res.json({ newId: newId });
        await pool.query('UPDATE last_issued_id SET id = $1 WHERE id = $2', [
          newId,
          id,
        ]);
      }
    } catch (e) {
      res.json({ error: e.message });
    }
  }

  async sendRequest(req, res) {
    try {
      await pool.query("INSERT INTO requests (id, request) VALUES ($1, $2)", [
        req.body.id,
        req.body.request,
      ]);
      res.json({ message: "ok" });
    } catch (e) {
      res.json({ error: e.message });
    }
  }

  async getRequests(req, res) {
    try {
      let fillteredRequests = [];
      const allRequests = await pool.query(
        "SELECT id FROM requests GROUP BY id"
      );

      let idList = [];
      allRequests.rows.forEach((row) => {
        idList.push(row.id);
      });

      for (let i = 0; i < idList.length; i++) {
        const id = idList[i];
        const group = await pool.query(
          "SELECT request FROM requests WHERE id = $1 AND request_time >  CURRENT_DATE - INTERVAL '1 months'",
          [id]
        );
        let groupRequests = [];

        group.rows.forEach((row) => {
          groupRequests.push(row.request);
        });

        let fillteredGroupRequests = removeSubstrings(groupRequests);
        fillteredRequests = [...fillteredRequests, ...fillteredGroupRequests];
      }

      res.json(fillteredRequests);
    } catch (e) {
      res.json({ error: e.message });
    }
  }

  // for tests

  // async deleteRequests(req, res) {
  //   try {
  //     await pool.query("DELETE FROM requests");
  //     res.json({ message: "ok" });
  //   } catch (e) {
  //     res.json({ error: e.message });
  //   }
  // }

  // async deleteLastIssuedId(req, res) {
  //   try {
  //     await pool.query('DELETE FROM last_issued_id');
  //     res.json({ message: "ok" });
  //   } catch (e) {
  //     res.json({ error: e.message });
  //   }
  // }
}
export default new RequestController();
