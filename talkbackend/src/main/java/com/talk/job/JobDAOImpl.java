package com.talk.job;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;


@Repository
@Transactional
@EnableTransactionManagement
public class JobDAOImpl  implements JobDAO{

	@Autowired
	SessionFactory sessionFactory;
	
	
	public void addJob(Job job) {
		Session session = sessionFactory.getCurrentSession();
		session.saveOrUpdate(job);
	}

	
	public Job getJobById(long id) {
		Session session = sessionFactory.getCurrentSession();
		Job job = (Job)session.createQuery("from Job where JobId="+id).getSingleResult();	
		return job;
	}

	
	public List<Job> listJobs() {
		Session session = sessionFactory.getCurrentSession();
		List<Job> list = session.createQuery("from Job where posted="+1).getResultList();	
		return list;
	}
	
	
	
}
