//Let's create a class for Nodes

class LinkNode {
    //Constructor , we want to initiate a node passing a value , but next node address as null
    constructor(value) {
        this._value = value
        this._next = null
    }

    //Node has two properties as Value and Next 
    //We need some methods to interact with the Node 

    // A getter method to get the value of the node
    get Value () {
        return this._value
    }

    //A getter method to get the Next node
    get Next () {
        return this._next
    }

    //A setter method to set the Next Node
    set Next (node) {
        this._next = node 
    }
}

//Let's create a class to for the Linked List
// A linked list will have the following properties
// Properties : _id , _head , nodeCount or count

//And the methods for interacting
// getId returns a specific id for specific instance of linked list
// getNodeCount returns number of Node Count
// addNode to add a node to the list
// deleteNode to delete the node
// addInSpecificIndex to add node in specific positions


class LinkedList {
    constructor(id) {
        this._id = id
        this._head = null
        this.count = 0
    }

    //Lets create setters and getters for accesing the private properties
    //Returns Id of a particular link list instance
    get Id () {
        return this._id
    }

    get NodeCount () {
        return this.count
    }

    //Lets create a method to create a node in the instance,
    //We will call this method from our front end to interact with the Algo

    addNode (value) {
        // first create a node from the LinkNode class passing a value
        let node = new LinkNode(value)
        //We will start from the head. So we set up a pointer currentNode to our Head
        let currentNode = this._head

        //Let's check if there is any other node connectefd with head, if head has no node we will set the new node as head
        if(currentNode == null) {
            this._head = node
            this.count++
            return 
        }

        //Now we traverse the link and try to reach at the end of list and add the node at the end
        while(currentNode && currentNode.Next != null) {
            currentNode = currentNode.Next
        }

        //At this point we will reach the end of the list
        //We will add the reference of the new Node to the currentNode, linking the new Node with the last node of the link 
        currentNode.Next = node
        this.count++

        //End of Add Method

    }

    //Let's Create a method to delete a node,
    //It takes a value and tries to match the value, traversing till the end of the list
    //If found it deletes the link, 

    deleteNode ( value) {
        // Set the current position to head
        let currentNode = this._head
        //We need to keep track of the previous node also
        let prevNode = null

        //Let's check if the value matches the head node or not, 
        if(currentNode && currentNode.Value == value) {
            this._head = currentNode.Next
            this.count--
            return
        }

        //We will now traverse the list until we find the matched value node
        while(currentNode && currentNode.Value != value) {
            //Assign Prev Node as the current Node
            prevNode = currentNode
            //Move current node to the next node
            currentNode = currentNode.Next
        }

        //Let's handle if we don't find any match
        //In this case current Node will traverse till the end
        //So we can check if currentNode is null or not
        if(currentNode == null) {
            console.log("Match Not found!")
        }

        //Let's do the delete operation, this code will execute if any match found
        //In that case, we will have currentNode as matched value and prevNode as the previous node of the matched node
        //We have to remove the link between prevNode and currentNode and assign the prevNode link to currentNode.Next

        prevNode.Next = currentNode.Next
        this.count--

        //End of delete function
    }


    //Let's create a method to add a node at any given position
    //This method will take a value and a index postion, and add the new node at any given index
    addBetweenNodes (value, index) {
        let currentNode = this._head
        let prevNode = null

        //As delete method we need to keep track of current node and the previous node
        //Along with that we need to keep track of positon index
        let countPos = 0


        //Let's create a new node with the given value
        let newNode = new LinkNode(value)

        //Let's handle if the new node needs to be add at the index 0
        //In this case the new node will be the header node and rest of the node will shift position

        if(index == 0 && countPos == 0) {
            newNode.Next = currentNode
            this._head = newNode
            this.count++
            return
        }

        //Now we will traverse the list until we reach our desired position index
        while(currentNode && index != countPos) {
            prevNode = currentNode
            currentNode = currentNode.Next
            countPos++
        }

        //Now let's handle if we don't find the desired position index
        if(currentNode == null || index > countPos) {

            console.log("Couldn't find the position!")
            //We have to return to stop adding the node
            return
        }

        //At this point we will have our desired index, currentNode and the prevNode
        //First we will assign the previous Node link to the New Node
        //Next we will link the new node to the currentNode

        prevNode.Next = newNode
        newNode.Next = currentNode
        this.count++

        //End of addBetweenNode methods
    }

    //Let's create a method to traverse through the entire list we will use this to print the list
    displayNode () {
        let currentNode = this._head
        let index = 0 //To keep track of the position

        //If the list has only head
        this._head && console.log("Head: " , this._head.Value)
        //Now we will traverse the list till the end and print the value of each node
        while(currentNode && currentNode.Next != null) {
            currentNode = currentNode.Next
            index++
            console.log("Node: " , currentNode.Value)
        }
    }

    //End of Link List class
}

//Let's test our algo

//Create a instance of LinkList
let l1 = new LinkedList()

//Add a node
l1.addNode(6)
l1.addNode(8)
l1.addNode(10)

console.log("After addition")
l1.displayNode()

l1.deleteNode(8)
console.log("After deletion")
l1.displayNode()

l1.addBetweenNodes(89,1)
console.log("After add between nodes")
l1.displayNode()

l1.addBetweenNodes(7,102)
console.log("after adding an invalid position")
l1.displayNode()

//Seems like we have some issue in addbetweennode