import { Tab } from "bootstrap";
import { Tabs } from "react-bootstrap";
import { Reviews } from "./Reviews";
import { Orders } from "./Orders";
import { Profile } from "./Profile";
import { Password } from "./Password";

export const Dashboard = () => {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>User Dashboard</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
          <div className="row">
            <div className="col-12">
              <Tabs
                defaultActiveKey="reviews"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="reviews" title="Review">
                  <Reviews />
                </Tab>
                <Tab eventKey="orders" title="Orders">
                  <Orders />
                </Tab>
                <Tab eventKey="profile" title="Edit Profile">
                  <Profile />
                </Tab>
                <Tab eventKey="password" title="Change Password">
                  <Password />
                </Tab>
                  
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
