CREATE TABLE "verification_token" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_token_unique" UNIQUE("token"),
	CONSTRAINT "emailTokenUnique" UNIQUE("email","token")
);
