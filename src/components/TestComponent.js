import {selector, useRecoilValue} from "recoil";
import {taskListDefinition} from "../App";

const taskCounterSelector = selector({
    key: "taskCounter",
    get: ({get}) => {
        const taskList = get(taskListDefinition);

        return taskList.length;
    }
})

export default function TestComponent() {
    const taskCounter = useRecoilValue(taskCounterSelector)

    return <div>Tiene {taskCounter} tarea(s)</div>
}
