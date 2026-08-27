import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  Sequelize,
} from "sequelize";

// 1. Define the class extending Model with Sequelize's type inferrers
export class BlogTable extends Model<
  InferAttributes<BlogTable>,
  InferCreationAttributes<BlogTable>
> {
  // Use 'declare' so TypeScript knows these exist at runtime without compiling down fields
  declare id: CreationOptional<number>; // Optional during .create() if autoincremented
  declare title: string;
  declare content: string;
  declare category: string;
  declare tags: string[]; // Or string depending on your dialect array setup
}

// 2. Initialize the model schema;
export function initBlogTable(sequelize : Sequelize) {
  BlogTable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.JSON, // Maps to array structure in JS
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "blogs",
    },
  );
}
