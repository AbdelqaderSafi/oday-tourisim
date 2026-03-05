import 'dotenv/config';
import * as argon from 'argon2';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'generated/prisma/client';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is missing');
const adapter = new PrismaMariaDb(url);
const prisma = new PrismaClient({ adapter });

async function main() {
  // البيانات التي ستعطيها للأدمن
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@company.com';
  const plainPassword = process.env.ADMIN_PASSWORD || 'SuperSecretPassword123!';

  // تشفير كلمة المرور قبل حفظها
  const hashedPassword = await argon.hash(plainPassword);

  // upsert تضمن عدم تكرار الإنشاء إذا قمت بتشغيل السكريبت أكثر من مرة
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  console.log('✅ تم إنشاء حساب الأدمن بنجاح:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
