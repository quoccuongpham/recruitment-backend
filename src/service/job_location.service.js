class JobLocationService {
	constructor(job_location_model) {
		this.JobLocation = job_location_model;
	}
	_extract_data(payload) {
		const job_location_data = {
			street_address: payload.street_address,
			city: payload.city,
			state: payload.state,
			country: payload.country,
			zip: payload.zip,
		};

		Object.keys(job_location_data).forEach(
			(key) =>
				job_location_data[key] === undefined &&
				delete job_location_data[key]
		);
		return job_location_data;
	}

	async create(data) {
		try {
			return await this.JobLocation.create(this._extract_data(data));
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async find(id) {
		try {
			return await this.JobLocation.findOne({
				where: {
					id: id,
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = JobLocationService;
