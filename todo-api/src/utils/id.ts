import { v4 } from "@std/uuid";

const Id = Object.freeze({
	makeId: crypto.randomUUID,
	isValidId: v4.validate,
});

export default Id;
