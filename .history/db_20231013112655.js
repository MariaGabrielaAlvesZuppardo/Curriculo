const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgres://bhbnsxqx:rxWPoC55mSOy41f_UzXw8BOCtiQz8T9T@isabelle.db.elephantsql.com/bhbnsxqx'
})

async function selectResume() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM curriculo LIMIT 1', (error, results) => {
      if (error) {
        reject(error);
      }

      else {
        resolve(results.rows[0]); // Retorna apenas o primeiro currículo
      }
    });
  });
}

module.exports = { selectResume };