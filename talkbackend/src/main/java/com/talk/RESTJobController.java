package com.talk;

import java.util.Date;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.talk.job.Job;
import com.talk.job.JobComment;
import com.talk.job.JobCommentDAO;
import com.talk.job.JobDAO;
import com.talk.job.JobUser;
import com.talk.job.JobUserDAO;
import com.talk.user.User;
import com.talk.user.UserDAO;



@RestController
public class RESTJobController {
	
	@Autowired
	JobDAO jobdao;
	
	@Autowired
	UserDAO userdao;
	
	@Autowired
	JobUserDAO jobuserdao;
	
	@Autowired
	JobCommentDAO jobcommentmdao;
	
	@RequestMapping(value="admin/postjob", method=RequestMethod.POST)
	public ResponseEntity<String> postBlog(@RequestBody JSONObject data) {
		System.out.println(data);

		Date date = new Date();
		System.out.println(date);

		Job job = new Job();

		job.setTitle(data.get("JobTitle").toString());
		job.setDescription(data.get("JobDesc").toString());
		job.setQualification(data.get("JobQual").toString());
		job.setPostdate(date);

		jobdao.addJob(job);

		JSONObject json = new JSONObject();

		json.put("status", "Job is Posted");
		System.out.println(json.toString());

		return new ResponseEntity<String>(json.toString(), HttpStatus.CREATED);
	}
	
	@RequestMapping("/viewjobs")
	public ResponseEntity<List<Job>> blogs() {

		List<Job> list = jobdao.listJobs();

		return new ResponseEntity<List<Job>>(list, HttpStatus.OK);

	}
	
	@RequestMapping(value="/applyjob", method=RequestMethod.POST)
	public ResponseEntity<String> applyjob(@RequestBody JSONObject data){
		

		System.out.println(data);
		
		Job job = jobdao.getJobById(Integer.parseInt((data.get("JobID").toString())));
		User user2 = userdao.getUserByEmail(data.get("User").toString());
		
		JobUser jobUser = new JobUser();
		
		jobUser.setJobId(job);
		jobUser.setUserId(user2);
		
		
		jobuserdao.addJobApplied(jobUser);
		
		JSONObject json = new JSONObject();

		json.put("status", "Job is Applied");
		System.out.println(json.toString());
		
		

		return new ResponseEntity<String>(json.toString(), HttpStatus.CREATED);
	}
	
	@RequestMapping("/viewjobapplied")
	public ResponseEntity<List<JobUser>> viewJobsApplied() {

		List<JobUser> list = jobuserdao.getall();

		return new ResponseEntity<List<JobUser>>(list, HttpStatus.OK);

	}
	
	
	@RequestMapping(value="/jobpostcomment", method=RequestMethod.POST)
	public ResponseEntity<List<JobComment>> jobPostComment(@RequestBody JSONObject data){
		
		System.out.println(data);
		
		User user = userdao.getUserByEmail(data.get("User").toString());
		Job job = jobdao.getJobById(Integer.parseInt(data.get("JobID").toString()));
		Date date = new Date();
		
		System.out.println(data.get("JobID").toString());
		System.out.println(data.get("Comment").toString());
		
		JobComment jobComment = new JobComment();
		jobComment.setJobComment(data.get("Comment").toString());
		jobComment.setUserId(user);
		jobComment.setJobId(job);
		jobComment.setCommentDate(date);
		
		jobcommentmdao.addJobComment(jobComment);
		
		List<JobComment> list = jobcommentmdao.listJobComment();
		
		return new ResponseEntity<List<JobComment>>(list, HttpStatus.OK);
	}
	
	@RequestMapping("/listpostcomments")
	public ResponseEntity<List<JobComment>> listForumComments(){
		List<JobComment> list = jobcommentmdao.listJobComment();
		
		return new ResponseEntity<List<JobComment>>(list, HttpStatus.OK);
	
	}
	
	@RequestMapping("admin/deletejob/{jobId}")
	public ResponseEntity<List<Job>> deleteEvent(@PathVariable("jobId") int jobId) {
		
		Job job = jobdao.getJobById(jobId);
		
		job.setPosted(false);
		
		jobdao.addJob(job);
		
		List<Job> list = jobdao.listJobs();
		
		return new ResponseEntity<List<Job>>(list, HttpStatus.OK);	
		
	}
	
	@RequestMapping(value="admin/editjob", method=RequestMethod.POST)
	public ResponseEntity<List<Job>> editJob(@RequestBody JSONObject data){
		
		System.out.println(data);
		
	
		Job job = jobdao.getJobById(Integer.parseInt(data.get("JobID").toString()));
		
		job.setJobId(Integer.parseInt(data.get("JobID").toString()));
		job.setTitle(data.get("JobTitle").toString());
		job.setDescription(data.get("JobDesc").toString());
		job.setQualification(data.get("JobQual").toString());
		
		System.out.println(data.get("JobID").toString());
		
		jobdao.addJob(job);
		
		List<Job> list = jobdao.listJobs();
		
		return new ResponseEntity<List<Job>>(list, HttpStatus.OK);	
		
	}
	
}
