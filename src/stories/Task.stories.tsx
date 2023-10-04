import React, {useState} from "react";
import {Task} from "../components/task/Task";
import {MainStoreDecorators} from "./MainStoreDecorators";
import {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions";

// export default {
//     title: "Single task",
//     component: Task,
//     decorators: [MainStoreDecorators]
// }
//
// export const TaskExample = () => {
//     return (
//         <>
//             <Task
//                 todoId={'1'}
//                 tasks={{id:'1',title:'Milk',isDone:false}}
//             />
//             <Task
//                 todoId={'2'}
//                 tasks={{id:'2',title:'Shake',isDone:true}}
//             />
//         </>
//     )
// }


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        handleRemoveTask: action('1'),
        handleChangeStatus: action('2'),
        handleChangeTaskTitle: action('3'),
        tasks: {id: '12wsdewfijdei2343', title: 'CSS', isDone: false},
        todoId: 'das'
    },
    decorators: [MainStoreDecorators]
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    args: {
        tasks: {id: '12wsdewfijdei2343', title: 'CSS', isDone: true},
        todoId: 'das'
    },
};

const TaskExample = () => {
    const [task,setTask] = useState({id:'1',title:"JS",isDone:false})
    return <Task tasks={task}
                 todoId={'das'}
                 handleRemoveTask={action('click')}
                 handleChangeStatus={() => setTask({...task,isDone:!task.isDone})}
                 handleChangeTaskTitle={(taskId:string,newTitle:string) => setTask({...task,title:newTitle})} />
}

export const TaskToggleIsDoneStory:Story = {
    render: () => <TaskExample />
}