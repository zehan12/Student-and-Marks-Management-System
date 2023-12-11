-- CreateTable
CREATE TABLE "Student" (
    "student_id" SERIAL NOT NULL,
    "student_name" TEXT NOT NULL,
    "standard" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Marks" (
    "marks_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "subject_name" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Marks_pkey" PRIMARY KEY ("marks_id")
);

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
