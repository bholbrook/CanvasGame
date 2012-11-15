function List() {
	this.first = null;
	//this.last = new Node(null, this.first);
	//this.size = 0;
	
	//this.size = function() { return this.size; }
	
	//this.isEmpty = function() { return this.size == 0; }
	
	this.addAt = function(data) {
		// If list is empty
		if (this.first == null) {
			this.first = new Node(data);
			return;
		}
		
		// Add to list
		var n = this.first;
		while (n.getNext() != null) {
			n = n.getNext();
		}
		
		var newNode = new Node(data);
		n.setNext(newNode);
		this.size++;
	}
	/*
	this.addAt = function(data) {
		if (this.size == 0) {
			this.last = new Node(data, this.first);
			this.size++;			
		} else {
			var n = new Node(data, null);
			this.first.setNext(n);						
			this.size++;
		}
	}
	*/
	this.add = function(data) { return this.addAt(data); }
		
	this.removeAt = function(index) {
		if (this.first = null) {
			return;
		}
		
		if (index == 0) {
			this.first = this.first.getNext();
			this.size--;
			return;
		}
		
		var temp = this.first;
		for (i=index; i>1; i--) {
			if (temp.getNext() == null) {
				return;
			}
			temp = temp.getNext();
		}
		
		temp.setNext(temp.getNext().getNext());
		this.size--;		
	}
	/*
	this.removeAt = function(index) {
		if (i < this.size && i >= 0) {
			if (index == 0) {
				this.last.setNext(this.last.getNext());
				this.size--;
			} else {
				var n = this.last;
				for (i=0; i<index-1; i++) {
					n = n.getNext();
				}
				n.setNext(n.getNext().getNext());
				this.size--;
			}
		} else {
			// OutOfBounds
		}
	}	
	*/
	this.remove = function(index) { return this.removeAt(index); }
	
	// TODO This is not done
	this.getAt = function(index) {
		if (index < this.size && index >= 0) {
			var n = this.last;
			for (i=0; i<index; i++) {
				n = n.getNext();
			}
			return n.getData();
		} else {
			// OutOfBounds
			return null;
		}
	}	
	this.get = function(index) { return this.getAt(index); }
}

function Node(data) {
	this.data = data;
	this.next = null;
	
	this.getData = function() { return this.data; }
	this.getNext = function() { return this.next; }
	
	this.setData = function(newData) { this.data = newData; }	
	this.setNext = function(newNext) { this.next = newNext; }
}