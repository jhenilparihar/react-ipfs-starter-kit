import { Web3Storage } from "web3.storage";
import React, { Component } from "react";

const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ0NmM0OTI0OWRGY0E2MjFlYTY1MjkzYzFhQkIyZWQ2OUZhYTA0MjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA5OTg0OTgyNDgsIm5hbWUiOiJFLUNlcnRpZnkifQ.9tckrWu32QWsyDR2-s8Azgn6suWzjwfwFKNY0Mc3Jm8",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "",
      img: "",
    };
  }

  changeHandler = async () => {
    this.setState({ loading: true });
    console.log("Hi");

    const fileInput = document.querySelector('input[type="file"]');

    console.log(fileInput);

    // Pack files into a CAR and send to web3.storage
    const rootCid = await client.put(fileInput.files); // Promise<CIDString>

    console.log(rootCid);

    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(rootCid); // Promise<Status | undefined>

    console.log(info);

    // Fetch and verify files from web3.storage
    const res = await client.get(rootCid); // Promise<Web3Response | null>
    console.log(res);

    const files = await res.files(); // Promise<Web3File[]>
    console.log(files);

    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
      // this.setState({ img: "https://"+file.cid+"/"+file.name});
      this.retrieve(file.cid);
    }
    this.setState({ loading: false});
  };

  retrieve = async (cid) => {
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    console.log(res.url)
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`)
    }
  
  }

  render() {
    return (
      <>
        {this.state.img.length > 0 ? (
          <>
            <img src={"https://"+this.state.img+".png"} />
          </>
        ) : (
          <>
            {!this.state.loading ? (
              <>
                <h1>Hi Jhenil</h1>
                <p>hiib</p>
                <input type="file" name="file" onChange={this.changeHandler} />
              </>
            ) : (
              <>Loading..</>
            )}
          </>
        )}
      </>
    );
  }
}

export default App;
