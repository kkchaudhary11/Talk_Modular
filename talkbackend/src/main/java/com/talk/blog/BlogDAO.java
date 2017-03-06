package com.talk.blog;

import java.util.List;

public interface BlogDAO {
	public void addBlog(Blog blog);
	public void deleteBlog(Blog blog);
	public Blog getBlogById(int id);
	//for users	
	public List<Blog> listBlogs();
	//for admin
	public List<Blog> listAllBlogs();
}
