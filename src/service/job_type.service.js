class JobTypeService {
	constructor(job_type_model) {
		this.JobType = job_type_model;
	}

	async get_name(id) {
		try {
			return (
				await this.JobType.findOne({
					where: {
						id: id,
					},
				})
			).dataValues.job_type;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = JobTypeService;
