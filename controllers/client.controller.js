const pool = require("../config/db");

const getAllClients = async (ctx) => {
    const clients = await pool.query("SELECT * FROM client;");
    console.log(clients);
    if (clients.rows.length == 0) {
        ctx.status = 404;
        return ctx.body = "Foydalanuvchilar topilmadi!"
    }
    ctx.status = 200;
    ctx.body = clients.rows;
}

const getClientById = async (ctx) => {
    const id = ctx.params.id;

    const client = await pool.query("SELECT * FROM client WHERE id = $1;", [id]);

    if (client.rows.length == 0) {
        ctx.status = 404;
        return ctx.body = "Foydalanuvchi topilmadi"
    }

    ctx.status = 200;
    ctx.body = client.rows[0];
}

const addClient = async (ctx) => {
    try {
      const {
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo
      } = ctx.request.body;
  
      const query = `
      INSERT INTO client (
              client_last_name,
              client_first_name,
              client_phone_number,
              client_info,
              client_photo
          ) values ($1, $2, $3, $4, $5) RETURNING *;
      `;
  
      const values = [
          client_last_name,
          client_first_name,
          client_phone_number,
          client_info,
          client_photo,
  
      ];
  
      const newClient = await pool.query(query, values);
      ctx.status = 200;
      ctx.body = newClient.rows[0];
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Serverda xatolik";
    }
  };

  const updateClient = async (ctx) => {
    try {
        const id = ctx.params.id;
    
        if (isNaN(id)){
            ctx.status = 404;
            return ctx.body = "Invalid Id";
        }

        const data = {
          client_last_name,
          client_first_name,
          client_phone_number,
          client_info,
          client_photo
        } = ctx.request.body;
    
        const query = `
        UPDATE client
            SET
            client_last_name = $1,
            client_first_name = $2,
            client_phone_number = $3,
            client_info = $4,
            client_photo = $5 
            WHERE id = $6 RETURNING *;
        `;

        const values = [
            client_last_name,
            client_first_name,
            client_phone_number,
            client_info,
            client_photo,
            id
        ];

        const newClient = await pool.query(query, values);

        if (newClient.rowCount == 0) {
            ctx.status = 200;
            return ctx.body = "Client topilmadi";
        }
        ctx.status = 200;
        ctx.body = newClient.rows[0];
      } catch (error) {
        ctx.status = 500;
        ctx.body = "Serverda xatolik";
        console.log(error);
      }
}

const deleteClient = async (ctx) => {
    try {
        const id = ctx.params.id;
    
        if (isNaN(id)){
            ctx.status = 404;
            return ctx.body = "Invalid Id";
        }

        const query = `DELETE FROM client
        WHERE id = $1 RETURNING *;
        `;

        const removedClient = await pool.query(query, [id]);

        if (removedClient.rowCount == 0) {
            ctx.status = 200;
            return ctx.body = "Client topilmadi";
        }
        
        
        ctx.status = 200;
        return ctx.body = `Removed client id: ${JSON.stringify(removedClient.rows[0])}`;
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Serverda xatolik";
        console.log(error);  
    }
}

module.exports = {
    getClientById,
    getAllClients,
    addClient,
    updateClient,
    deleteClient
}