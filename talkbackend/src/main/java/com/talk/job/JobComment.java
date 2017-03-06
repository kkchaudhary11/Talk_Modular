package com.talk.job;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.talk.user.User;

@Entity

public class JobComment {
	
	@Id @GeneratedValue(strategy=GenerationType.SEQUENCE)
	private long jobCommentId;
	
	private String jobComment;
	
	@ManyToOne
	@JoinColumn(name="jobId")
	private Job jobId;
	

	@ManyToOne
	@JoinColumn(name="userId")
	private User userId;
	
	private Date commentDate;
	
	
	//getters and setters

	public long getJobCommentId() {
		return jobCommentId;
	}

	public void setJobCommentId(long jobCommentId) {
		this.jobCommentId = jobCommentId;
	}

	public String getJobComment() {
		return jobComment;
	}

	public void setJobComment(String jobComment) {
		this.jobComment = jobComment;
	}

	public Job getJobId() {
		return jobId;
	}

	public void setJobId(Job jobId) {
		this.jobId = jobId;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Date getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}
	
	

}
