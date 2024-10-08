/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    email: 'jack@example.com', nationality: 'Singaporean',
    bookingTime: new Date(), seatNumber: 1
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    email: 'rose@example.com', nationality: 'Australian',
    bookingTime: new Date(), seatNumber: 2
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const {traveller} = props;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td>
      <td>{traveller.nationality}</td>
      <td>{traveller.bookingTime.toString()}</td>
      <td>{traveller.seatNumber}</td>
    </tr>
  );
}

function Display({ travellers }) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Nationality</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller}/>
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = { 
      name: '',
      phone: '',
      email: '',
      nationality: '' 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const newTraveller = {
      id: this.props.nextId,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      nationality: this.state.nationality,
      bookingTime: new Date(),
      seatNumber: this.props.nextId
    };
    this.props.bookTraveller(newTraveller);
    this.setState({ name: '', phone: '', email: '', nationality: '' });
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input 
          type="text" 
          name="name" 
          value={this.state.name} 
          onChange={(e) => this.setState({ name: e.target.value })}
          placeholder="Name" 
          required
        />
        <input 
          type="text" 
          name="phone" 
          value={this.state.phone} 
          onChange={(e) => this.setState({ phone: e.target.value })}
          placeholder="Phone" 
          required
        />
        <input 
          type="email" 
          name="email" 
          value={this.state.email} 
          onChange={(e) => this.setState({ email: e.target.value })}
          placeholder="Email" 
          required
        />
        <input 
          type="text" 
          name="nationality" 
          value={this.state.nationality} 
          onChange={(e) => this.setState({ nationality: e.target.value })}
          placeholder="Nationality" 
          required
        />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {  // travellers's name could be repeated, so use id to delete
  constructor() {
    super();
    this.state = { id: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    // const form = document.forms.deleteTraveller;
    // console.log(form.traverlername.value);
    // code to delete the traveller
    // deleteTraveller(form.travellername.value);
    this.props.deleteTraveller(parseInt(this.state.id));
    this.setState({ id: '' });
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	    <input type="number" name="id" value={this.state.id}
        onChange={(e) => this.setState({ id: e.target.value })} placeholder="Enter an ID to delete" />
      <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    // const seats = [];
    const totalSeats = this.props.totalSeats;
    const reservedSeats = this.props.reservedSeats;
    const seats = Array.from({ length: totalSeats }, (_, i) => i < reservedSeats);
	
  return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    {/* <h3>Total Free Seats: {this.props.totalSeats - this.props.reservedSeats}</h3> */}
    <h3>Total Free Seats: {totalSeats - reservedSeats}</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '300px' }}>
                    {seats.map((isReserved, index) => (
                        <div
                            key={index}
                            style={{
                                width: '50px',
                                height: '50px',
                                margin: '5px',
                                backgroundColor: isReserved ? 'gray' : 'green',
                                textAlign: 'center',
                                lineHeight: '50px',
                                color: 'white',
                            }}
                        >
                            {isReserved ? 'Reserved' : 'Free'}
                        </div>
                    ))}
                </div>
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 'home', nextId: initialTravellers.length + 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
}

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    console.log('Setting selector to:', value);
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      console.log('loading data...');
      this.setState({ travellers: initialTravellers }, () => {
        console.log('Travellers state updated:', this.state.travellers);
      });
      }, 500);
  }

  bookTraveller(newTraveller) {
    if (this.state.travellers.length >= 10) {
      alert("No more seats available");
      return; // stop adding new traveller if all seats are reserved
    }
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState(prevState => ({
        travellers: [...prevState.travellers, newTraveller], // add newTraveller to the end of the array
        nextId: prevState.nextId + 1 // update nextId
      }));
  }

  deleteTraveller(id) {
    if (this.state.travellers.length === 0) {
      alert("No travellers to delete");
      return;
    }
    
    const travellerToDelete = this.state.travellers.find(traveller => traveller.id === id);
    if (!travellerToDelete) {
      alert("Traveller ID not found");
      return;
    }

	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    console.log('Deleting traveller with id:', id);
    this.setState(prevState => ({
      travellers: prevState.travellers.filter(traveller => traveller.id !== id)
    }));
  }

  render() {
    const totalSeats = 10;
    const reservedSeats = this.state.travellers.length;

    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
      <button onClick={() => this.setSelector('home')}>Home</button>
      <button onClick={() => this.setSelector('displayTravellers')}>Display Travellers</button>
      <button onClick={() => this.setSelector('addTraveller')}>Add Traveller</button>
      <button onClick={() => this.setSelector('deleteTraveller')}>Delete Traveller</button>

  </div>

	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{this.state.selector === 'home' && (
            <Homepage totalSeats={totalSeats} reservedSeats={reservedSeats} />
          )}

    {/*Q3. Code to call component that Displays Travellers.*/}
    {this.state.selector === 'displayTravellers' && <Display travellers={this.state.travellers} deleteTraveller={this.deleteTraveller} />}
		
    {/*Q4. Code to call the component that adds a traveller.*/}
    {this.state.selector === 'addTraveller' && <Add bookTraveller={this.bookTraveller} nextId={this.state.nextId} />}

		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {this.state.selector === 'deleteTraveller' && <Delete deleteTraveller={this.deleteTraveller}/>}
    {/* <Delete deleteTraveller={this.deleteTraveller} /> */}
	</div>
</div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
