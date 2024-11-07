-- AlterTable
CREATE SEQUENCE siteuser_id_seq;
ALTER TABLE "siteuser" ALTER COLUMN "id" SET DEFAULT nextval('siteuser_id_seq');
ALTER SEQUENCE siteuser_id_seq OWNED BY "siteuser"."id";
