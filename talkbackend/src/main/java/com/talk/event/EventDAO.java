package com.talk.event;

import java.util.List;


public interface EventDAO {

	public void addEvent(Event event);
	public Event getEventById(long id);
		
	public List<Event> listEvents();
	
	public void deleleEvent(Event event);
	
}
