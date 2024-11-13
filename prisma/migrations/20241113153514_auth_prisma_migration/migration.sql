-- CreateTable
CREATE TABLE "belongsto" (
    "categoryid" INTEGER NOT NULL,
    "itemid" INTEGER NOT NULL,

    CONSTRAINT "belongsto_pkey" PRIMARY KEY ("categoryid","itemid")
);

-- CreateTable
CREATE TABLE "category" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "supercategoryid" INTEGER,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condition" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "askingprice" DECIMAL(10,2) NOT NULL,
    "sellerid" INTEGER NOT NULL,
    "buyerid" INTEGER,
    "conditionid" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemchangestate" (
    "changetime" TIMESTAMP(6) NOT NULL,
    "itemid" INTEGER NOT NULL,
    "stateid" INTEGER NOT NULL,

    CONSTRAINT "itemchangestate_pkey" PRIMARY KEY ("itemid","stateid","changetime")
);

-- CreateTable
CREATE TABLE "message" (
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "senttime" TIMESTAMP(6) NOT NULL,
    "seentime" TIMESTAMP(6),
    "senderid" INTEGER NOT NULL,
    "receiverid" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picture" (
    "url" TEXT NOT NULL,
    "itemid" INTEGER NOT NULL,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("url")
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siteuser" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleid" INTEGER NOT NULL,
    "password" TEXT,
    "country" TEXT,
    "city" TEXT,
    "street" TEXT,
    "houseno" TEXT,
    "roleid" INTEGER NOT NULL,
    "registertime" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "siteuser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "siteuser_email_key" ON "siteuser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "siteuser_googleid_key" ON "siteuser"("googleid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "belongsto" ADD CONSTRAINT "belongsto_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "belongsto" ADD CONSTRAINT "belongsto_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_supercategoryid_fkey" FOREIGN KEY ("supercategoryid") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_buyerid_fkey" FOREIGN KEY ("buyerid") REFERENCES "siteuser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_conditionid_fkey" FOREIGN KEY ("conditionid") REFERENCES "condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_sellerid_fkey" FOREIGN KEY ("sellerid") REFERENCES "siteuser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itemchangestate" ADD CONSTRAINT "itemchangestate_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itemchangestate" ADD CONSTRAINT "itemchangestate_stateid_fkey" FOREIGN KEY ("stateid") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiverid_fkey" FOREIGN KEY ("receiverid") REFERENCES "siteuser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "siteuser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "siteuser" ADD CONSTRAINT "siteuser_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
