module.exports = class {
    constructor() {
        let DataAccess = require("../data-access/data-access");
        this.dataAccessObject = new DataAccess();
    }

    registerLawyer(lawyer) {
        let query = `INSERT INTO lawyers (
            id,
            lawyerName,
            startYearOfPractice,
            totalExperience,
            areaOfSpecialization,
            almaMater,
            lawyerPassword,
            userId,
            appointmentFees,
            location,
            emailId,
            contact
        ) VALUES (
            '` + lawyer.id + `',
            '` + lawyer.name + `',
            '` + lawyer.startYearOfPractice + `',
            '` + lawyer.totalExperience + `',
            '` + lawyer.areaOfSpecialization + `',
            '` + lawyer.almaMater + `',
            '` + lawyer.password + `',
            '` + lawyer.userId + `',
            '` + lawyer.appointmentFees + `',
            '` + lawyer.location + `',
            '` + lawyer.emailId + `',
            '` + lawyer.contact + `'
        )`;
        return this.dataAccessObject.insertData(query);
    }
}