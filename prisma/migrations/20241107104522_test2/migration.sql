-- AlterTable
CREATE SEQUENCE category_id_seq;
ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT nextval('category_id_seq');
ALTER SEQUENCE category_id_seq OWNED BY "category"."id";
