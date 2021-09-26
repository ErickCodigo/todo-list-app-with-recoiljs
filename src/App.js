import {Checkbox, Container, ListItem, ListItemIcon, ListItemText, TextField, Typography} from "@material-ui/core";
import {atom, useRecoilState} from "recoil";
import {useState} from "react";
import {Delete} from "@material-ui/icons";
import TestComponent from "./components/TestComponent";

export const taskListDefinition = atom({
    key: "taskList",
    default: []
})

const defaultTask = {name: ""};

export default function App() {
    const [taskList, setTaskList] = useRecoilState(taskListDefinition);
    const [task, setTask] = useState(defaultTask);

    function handlerChange(e) {
        const {name, value} = e.target;

        setTask({[name]: value});
    }

    function handlerSubmit(e) {
        e.preventDefault();

        setTaskList(prevList => [...prevList, {...task}])
        setTask(defaultTask);
    }

    function handlerDeleteTask(index) {
        // esto del index es momentáneo ya que en el futuro debe ser fácil, seguro y eficiente de manejar.
        // y el index puede que no sea seguro.
        setTaskList(prevList => prevList.filter((_, i) => i !== index));
    }

    const hasTasks = !!taskList.length;

    return (
        <Container maxWidth="md">
            <Typography style={{marginBottom: "2rem"}} component="h1" variant="h4">Hola buen día</Typography>

            <div>
                <form onSubmit={handlerSubmit}>
                    <TextField
                        fullWidth
                        placeholder="Ingresa una tarea"
                        name="name"
                        value={task.name}
                        onChange={handlerChange}/>
                </form>

                <div style={{marginTop: "2rem"}}>
                    {hasTasks && (
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Typography component="h2" variant="h5">Tus tareas:</Typography>
                            <TestComponent/>
                        </div>
                    )}

                    {!hasTasks && <div>No tiene tareas actualmente.</div>}

                    {taskList.map((task, index) => {
                        const labelId = `checkbox-list-label-${task.name + index}`;

                        return (
                            <ListItem key={index} role={undefined}>
                                <ListItemIcon style={{display: "flex", alignItems: "center"}}>
                                    <Delete onClick={() => handlerDeleteTask(index)}/>
                                    <Checkbox
                                        edge="start"
                                        checked={false}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{'aria-labelledby': labelId}}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={task.name}/>
                            </ListItem>
                        )
                    })}
                </div>
            </div>

        </Container>
    );
}
