
export function debounce(delay: number = 300): MethodDecorator {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

		const original = descriptor.value;
		const key = `__timeout__${propertyKey}`;

		descriptor.value = function (...args) {
			clearTimeout(this[key]);
			this[key] = setTimeout(() => original.apply(this, args), delay);
		};

		return descriptor;
	};
}

export function limit(delay: number = 300): MethodDecorator {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

		const original = descriptor.value;
		const key = `__limit__${propertyKey}`;
		const key2 = `__limit__${propertyKey}_allow`;


		descriptor.value = function (...args) {
			if (!this[key2]) {
				original.apply(this, args);
				this[key2] = true;
				this[key] = setTimeout(() => this[key2] = false, delay);
			}
		};

		return descriptor;
	};
}
