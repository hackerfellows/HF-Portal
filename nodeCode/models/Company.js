(function() {
    "use strict";

    module.exports = function(sequelize, DataTypes) {

        return sequelize.define("companies", {

            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: DataTypes.INTEGER },
            name: { type:DataTypes.STRING, default: "" },
            primary_contact: DataTypes.STRING,
            location: DataTypes.STRING,
            company_size: DataTypes.INTEGER,
            industry: DataTypes.STRING,
            bio: DataTypes.TEXT,
            description: DataTypes.STRING,
            developer_type: DataTypes.STRING,
            website_url: DataTypes.STRING,
            contact_email: DataTypes.STRING,
            contact_phone: DataTypes.STRING,
            map_url: DataTypes.STRING,
            logo_url: DataTypes.STRING, //is this the same as image_url?
            age: DataTypes.STRING,
            value_prop: DataTypes.TEXT,
            whyHF: DataTypes.TEXT,
            devneeds0: DataTypes.STRING,
            devneeds1: DataTypes.STRING,
            devneeds2: DataTypes.STRING,
            devneeds3: DataTypes.STRING,
            devneeds4: DataTypes.STRING,
            ideal_dev: DataTypes.TEXT,
            image_url: DataTypes.STRING
        },{
            timestamps: false, // add updated_at and created_at
            paranoid: false // add deleted_at

        });
    };
}());
