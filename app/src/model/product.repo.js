import db from "./db.connect.js";

export async function getAllProducts() {
  const [rows] = await db.execute(`
    SELECT product_id, name, price, description, category, url, environment
    FROM dev_tools
    ORDER BY product_id ASC
  `);

  return rows;
}

export async function getProductById(id) {
  const [rows] = await db.execute(
    `
    SELECT product_id, name, price, description, category, url, environment
    FROM dev_tools
    WHERE product_id = ?
    `,
    [id]
  );

  return rows[0] ?? null;
}

export async function getFilteredProducts({
  category,
  environment,
  minPrice,
  maxPrice,
  sort,
}) {
  let sql = `
    SELECT product_id, name, price, description, category, url, environment
    FROM dev_tools
    WHERE 1=1
  `;

  const params = [];

  if (category) {
    sql += ` AND category = ?`;
    params.push(category);
  }

  if (environment) {
    sql += ` AND environment = ?`;
    params.push(environment);
  }

  if (minPrice !== null || maxPrice !== null) {
    sql += ` AND price REGEXP '^[0-9]+(\\\\.[0-9]{1,2})?$'`;
  }

  if (minPrice !== null) {
    sql += ` AND CAST(price AS DECIMAL(10,2)) >= ?`;
    params.push(minPrice);
  }

  if (maxPrice !== null) {
    sql += ` AND CAST(price AS DECIMAL(10,2)) <= ?`;
    params.push(maxPrice);
  }

  if (sort === "name") {
    sql += ` ORDER BY name ASC`;
  } else if (sort === "price_asc") {
    sql += `
      ORDER BY
        CASE WHEN LOWER(price) = 'free' THEN 0 ELSE 1 END,
        CAST(CASE WHEN LOWER(price) = 'free' THEN '0' ELSE price END AS DECIMAL(10,2)) ASC
    `;
  } else if (sort === "price_desc") {
    sql += `
      ORDER BY
        CASE WHEN LOWER(price) = 'free' THEN 1 ELSE 0 END,
        CAST(CASE WHEN LOWER(price) = 'free' THEN '0' ELSE price END AS DECIMAL(10,2)) DESC
    `;
  } else {
    sql += ` ORDER BY product_id ASC`;
  }

  const [rows] = await db.execute(sql, params);
  return rows;
}