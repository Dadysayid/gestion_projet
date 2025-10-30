import { Pool } from "pg";
import * as dotenv from "dotenv";

async function main() {
  // Charger les variables d'environnement
  dotenv.config({ path: ".env.local" });

  const DATABASE_URL = process.env.DATABASE_URL;

  console.log("🔍 Vérification de la configuration de la base de données...\n");

  // 1. Vérifier si DATABASE_URL est défini
  if (!DATABASE_URL) {
    console.error("❌ ERREUR: DATABASE_URL n'est pas défini dans .env.local");
    console.log("\n💡 Solution: Créez un fichier .env.local avec:");
    console.log(
      "   DATABASE_URL=postgresql://user:password@localhost:5432/dbname\n"
    );
    process.exit(1);
  }

  console.log("✅ DATABASE_URL est défini");
  console.log(`   URL: ${DATABASE_URL.replace(/:[^:@]+@/, ":****@")}\n`);

  // 2. Tester la connexion
  const pool = new Pool({ connectionString: DATABASE_URL });

  try {
    console.log("🔌 Test de connexion à PostgreSQL...");
    const client = await pool.connect();
    console.log("✅ Connexion réussie!\n");

    // 3. Vérifier les tables better-auth
    console.log("📊 Vérification des tables better-auth...\n");

    const requiredTables = ["user", "session", "account", "verification"];

    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    const existingTables = result.rows.map((row) => row.table_name);

    console.log("Tables existantes dans la base de données:");
    existingTables.forEach((table) => {
      console.log(`  - ${table}`);
    });

    console.log("\nTables requises par better-auth:");
    const missingTables: string[] = [];
    requiredTables.forEach((table) => {
      if (existingTables.includes(table)) {
        console.log(`  ✅ ${table}`);
      } else {
        console.log(`  ❌ ${table} - MANQUANTE`);
        missingTables.push(table);
      }
    });

    if (missingTables.length > 0) {
      console.log(`\n⚠️  ${missingTables.length} table(s) manquante(s)!`);
      console.log(
        "\n💡 Solution: Exécutez les commandes suivantes pour créer les tables:"
      );
      console.log("   pnpm run auth:generate");
      console.log("   pnpm run auth:migrate");
    } else {
      console.log("\n✅ Toutes les tables better-auth sont présentes!");
    }

    client.release();
    await pool.end();

    console.log("\n✨ Vérification terminée!");
  } catch (error: any) {
    console.error("\n❌ ERREUR lors de la connexion:");
    console.error(`   ${error.message}\n`);
    console.log("💡 Vérifiez que:");
    console.log("   - PostgreSQL est en cours d'exécution");
    console.log("   - La DATABASE_URL est correcte");
    console.log("   - L'utilisateur a les permissions nécessaires\n");
    await pool.end();
    process.exit(1);
  }
}

main().catch(console.error);
