(function() {
    "use strict";
    module.exports = function(sequelize, DataTypes) {
        return sequelize.define( "users", {
            id:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            email:         { type: DataTypes.STRING, allowNull: false },
            userType:   { type: DataTypes.STRING, allowNull: false },
            password:     { type: DataTypes.STRING, allowNull: false },

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

        },
        {
            timestamps: false,
            paranoid: false,
            // prevent password and dates getting returned by default from queries
            scopes: {

                public: {

                    attributes: ['id', 'email', 'userType']
                }
            }
        });
    };
}());
