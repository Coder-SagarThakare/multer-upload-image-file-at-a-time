import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    
    for (var key in data.file) {
      console.log('for loop', data.file[key]);
      if (data.file[key].type === 'application/pdf') {
        formData.append('pdfs', data.file[key])
      } else {
        formData.append("images", data.file[key]);
      }
    }

    axios
      .post("http://localhost:8200/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("data sended successfulyy");
      })
      .catch((err) => {
        console.log("data not sende");
      });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submit)}>
        <input type="file" multiple name="user_file" {...register("file")} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;

