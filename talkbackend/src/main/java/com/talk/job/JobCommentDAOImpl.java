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
public class JobCommentDAOImpl implements JobCommentDAO {
	
	@Autowired
	SessionFactory sessionFactory;

	public void addJobComment(JobComment jobComment) {
		Session session = sessionFactory.getCurrentSession();
		session.saveOrUpdate(jobComment);
	}
	
	public List<JobComment> listJobComment() {
		Session session = sessionFactory.getCurrentSession();
		List<JobComment> list  = session.createQuery("from JobComment").getResultList();
		return list;
	}
	

}
