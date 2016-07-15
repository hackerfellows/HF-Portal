(function() {
    "use strict";

    module.exports = function(sequelize, DataTypes) {

        return sequelize.define("fellows", {

            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: DataTypes.INTEGER },
            first_name: { type:DataTypes.STRING, default: "" },
            last_name: { type:DataTypes.STRING, default: "" },
            university: DataTypes.STRING,
            major: DataTypes.STRING,
            graduation: DataTypes.STRING,
            hometown: DataTypes.STRING,
            phone: DataTypes.STRING,
            residentUSA: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            dreamjob: DataTypes.TEXT,
            resumeURL: DataTypes.STRING,
            coolthings: DataTypes.TEXT,
            referral: DataTypes.STRING,
            whyHF: DataTypes.TEXT,
            MIimpact: DataTypes.TEXT,
            developer_type: DataTypes.STRING,
            devskills: DataTypes.TEXT,
            achievements: DataTypes.TEXT,
            involvements: DataTypes.TEXT,
            git_hub: DataTypes.STRING,
            comments: DataTypes.TEXT,


            //Profile only
            interests: DataTypes.TEXT,
            bio: DataTypes.STRING,
            portfolio: DataTypes.STRING,
            question: DataTypes.STRING,
            answer: DataTypes.STRING,
            image_url: DataTypes.STRING,

            application_flag: { type: DataTypes.INTEGER, defaultValue: 0 },
            profile_flag: { type: DataTypes.INTEGER, defaultValue: 0 },
            vote_flag: { type: DataTypes.INTEGER, defaultValue: 0 },
            accepted: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            enabled: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }

        },{

            timestamps: false, // add updated_at and created_at
            paranoid: false // add deleted_at

        });

    };
}());
