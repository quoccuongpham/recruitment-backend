class JobPostSkillSet {
	constructor(job_post_skill_set_model) {
		this.JobPostSkillSet = job_post_skill_set_model;
	}

	async delete_by_job_id(job_id) {
		try {
			return await this.JobPostSkillSet.destroy({
				where: {
					job_post_id: job_id,
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = JobPostSkillSet;
