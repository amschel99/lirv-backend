import JobPosting from "../models/JobPosting";

export const deleteJob = async (jobId,user) => {
    try {
        // Delete the specified job
        const deletedJob = await JobPosting.findByIdAndDelete(jobId);

        if (!deletedJob) {
            console.log('No job found with the given ID');
            return [];
        }

        // Retrieve all remaining jobs
        const remainingJobs = await JobPosting.find({});

        console.log('Deleted Job:', deletedJob);
        console.log('Remaining Jobs:', remainingJobs);

        return remainingJobs;
    } catch (e) {
        console.error('Error deleting job:', e);
        return [];
    }
};
