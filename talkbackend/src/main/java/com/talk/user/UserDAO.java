package com.talk.user;

import java.util.List;

public interface UserDAO {
	
	public void addUser(User user);
	public void deleteUser(int id);
	public void updateUser(User user);
	public User getUserById(int id);
	public List<User> listUser();
	public User getUserByEmail(String name);
	public List<User> getAllUserExceptMe(String name);
}