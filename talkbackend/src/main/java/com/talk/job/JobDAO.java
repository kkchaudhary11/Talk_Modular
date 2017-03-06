package com.talk.job;

import java.util.List;


public interface JobDAO {

	public void addJob(Job job);
	public Job getJobById(long id);
		
	public List<Job> listJobs();
}
