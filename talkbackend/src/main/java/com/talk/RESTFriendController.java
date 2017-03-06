package com.talk;

import java.security.Principal;
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

import com.talk.friend.Friend;
import com.talk.friend.FriendDAO;
import com.talk.user.User;
import com.talk.user.UserDAO;

@RestController
public class RESTFriendController {
	
	@Autowired
	UserDAO userdao;
	
	@Autowired
	FriendDAO frienddao;

	@RequestMapping(value="/getusers", method=RequestMethod.POST)
	public ResponseEntity<List<User>> getAllUsers(@RequestBody JSONObject data , Principal p){
		
		List<User> list = userdao.getAllUserExceptMe( data.get("Email").toString() );
		
		return new ResponseEntity<List<User>>(list,HttpStatus.OK);
	}
	
	@RequestMapping(value="/friendrequest", method=RequestMethod.POST)
	public ResponseEntity<String> friendRequest(Principal p,@RequestBody JSONObject data){
		
		String friendId = data.get("FriendId").toString();
		
		System.out.println(friendId);
		
		User user = userdao.getUserByEmail( data.get("Email").toString() );
		User friend = userdao.getUserById(Integer.parseInt(friendId));
		
		Friend friendobj = new Friend();
		
		friendobj.setUserId(user);
		friendobj.setFriendId(friend);
		friendobj.setMe(true);
		friendobj.setStatus("NEW");
		
		frienddao.addFriend(friendobj);
		
		friendobj.setUserId(friend);
		friendobj.setFriendId(user);
		friendobj.setMe(false);
		friendobj.setStatus("NEW");
		
		frienddao.addFriend(friendobj);
		
		JSONObject json = new JSONObject();

		json.put("status", "FRIEND REQUEST SEND");
		System.out.println(json.toString());
		
		return new ResponseEntity<String>(json.toString(),HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/friendrequests", method=RequestMethod.POST)
	public ResponseEntity<List<Friend>> friendRequest( @RequestBody JSONObject data ,Principal p){
		
		User user = userdao.getUserByEmail( data.get("Email").toString() );
		long id = user.getUserId();
		
		List<Friend> list  = frienddao.getFriendRequsts(id);
		
		return new ResponseEntity<List<Friend>>(list,HttpStatus.OK);
	}
	
	@RequestMapping(value="/acceptfriendrequest/{friendId}", method=RequestMethod.POST)
	public ResponseEntity<List<Friend>> acceptFriendRequest(@PathVariable("friendId") long friendId, @RequestBody JSONObject data, Principal p ){
		
		System.out.println(friendId);
		System.out.println(data.get("Email").toString());
		User user = userdao.getUserByEmail( data.get("Email").toString() );
		
		long loggedInUserId = user.getUserId();
		
		System.out.println( loggedInUserId );
		
		//friend x-->y
		Friend friend1 = frienddao.getFriend(loggedInUserId, friendId);
		friend1.setStatus("ACCEPTED");
		frienddao.updateFriend(friend1);
		
		//friend y-->x
		Friend friend2 = frienddao.getFriend(friendId, loggedInUserId);
		friend2.setStatus("ACCEPTED");
		frienddao.updateFriend(friend2);
		
		List<Friend> list = frienddao.getFriendRequsts(loggedInUserId);
	
		return new ResponseEntity<List<Friend>>(list,HttpStatus.CREATED);
	}
	
	
	
	@RequestMapping(value="/rejectfriendrequest", method=RequestMethod.POST)
	public ResponseEntity<List<Friend>> rejectFriendRequest( @RequestBody JSONObject data, Principal p ){
		
		long friendId = Long.parseLong(data.get("FriendId").toString());
		
		System.out.println(friendId);
		User user = userdao.getUserByEmail( data.get("Email").toString() );
		
		long loggedInUserId = user.getUserId();
		
		//friend x-->y
		frienddao.delFriend(loggedInUserId, friendId);
				
		//friend y-->x
		frienddao.delFriend( friendId , loggedInUserId);
				
		
		List<Friend> list = frienddao.getFriendRequsts(loggedInUserId);
	
		return new ResponseEntity<List<Friend>>(list,HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/removefriendrequest/{friendId}", method=RequestMethod.POST)
	public ResponseEntity<List<Friend>> removeFriendRequest(@PathVariable("friendId") long friendId,  @RequestBody JSONObject data, Principal p ){
		
		System.out.println(friendId);
		User user = userdao.getUserByEmail( data.get("Email").toString() );
		
		long loggedInUserId = user.getUserId();
		
		//friend x-->y
		frienddao.delFriend(loggedInUserId, friendId);
		
		//friend y-->x
		frienddao.delFriend( friendId , loggedInUserId);
		
		List<Friend> list = frienddao.getFriendRequsts(loggedInUserId);
	
		return new ResponseEntity<List<Friend>>(list,HttpStatus.CREATED);
	}
	
	@RequestMapping(value="getfriends", method=RequestMethod.POST)
	public ResponseEntity<List<Friend>> getFriends(@RequestBody JSONObject data,Principal p){
		
		System.out.println(data.get("Email"));
		
		User user = userdao.getUserByEmail( data.get("Email").toString() );
		long userId = user.getUserId();
		
		List<Friend> list = frienddao.listFriends(userId);
		
		return new ResponseEntity<List<Friend>>(list,HttpStatus.OK);
	}
	
	@RequestMapping(value="countfriendrequests", method=RequestMethod.POST)
	public ResponseEntity<String> countFriendRequests(@RequestBody JSONObject data,Principal p){
	
		System.out.println(data.get("Email"));
		
		User user = userdao.getUserByEmail( data.get("Email").toString() );
		long userId = user.getUserId();
		
		int count = frienddao.countFriendRequset(userId);
		System.out.println(count);
		
		JSONObject json = new JSONObject();

		json.put("count", count);
		System.out.println(json.toString());
		
		return new ResponseEntity<String>(json.toString(),HttpStatus.CREATED);
		
	}
	
	
	

}