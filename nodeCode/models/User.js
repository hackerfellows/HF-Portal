(function() {
    "use strict";
    module.exports = function(sequelize, DataTypes) {
        return sequelize.define( "users", {
            id:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            email:         { type: DataTypes.STRING, allowNull: false },
            userType:   { type: DataTypes.STRING, allowNull: false },
            password:     { type: DataTypes.STRING, allowNull: false },

            application_past_due: { type: DataTypes.INTEGER, defaultValue: 0 },
            vote_enabled: { type: DataTypes.INTEGER, defaultValue: 0 },
            application_state: { type: DataTypes.INTEGER, defaultValue: 0 },
               /* 4 application states:
                *   IN_PROGRESS 0,
                *   APPLIED 1,
                *   ACCEPTED 2,
                *   REJECTED 3
                */
            profile_enabled: {
                type: DataTypes.INTEGER,
                defaultValue: 1
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
