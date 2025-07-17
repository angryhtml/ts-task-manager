import { describe, it, expect } from '@jest/globals';
import { TaskManager, Task } from './index';

describe('TaskManager', () => {
    it('should add a task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task', completed: false };

        manager.addTask(task);
        const tasks = manager.getAllTasks();

        expect(tasks).toHaveLength(1);
        expect(tasks[0]).toEqual(task);
    })

    it('should remove a task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task', completed: false };

        manager.addTask(task);
        manager.removeTask(task.id);
        const tasks = manager.getAllTasks();

        expect(tasks).toHaveLength(0);
    })

    it('should track and change the status of a task', () => {
        const manager = new TaskManager<Task>();
        const task: Task = { id: 1, title: 'Test Task', completed: false };

        manager.addTask(task);
        let tasks = manager.getAllTasks();

        expect(tasks[0].completed).toBe(false);
        manager.toggleComplete(task.id);
        tasks = manager.getAllTasks();

        expect(tasks[0].completed).toBeTruthy();
    })

    it('should get all tasks', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true }

        manager.addTask(task1);
        manager.addTask(task2);
        const tasks = manager.getAllTasks();

        expect(tasks).toContainEqual(task1);
        expect(tasks).toContainEqual(task2);
        expect(tasks).toHaveLength(2);
    })

    it('should get all completed tasks', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true }

        manager.addTask(task1);
        manager.addTask(task2);
        const completedTasks = manager.getCompletedTasks();

        expect(completedTasks).toContainEqual(task2);
        expect(completedTasks).not.toContainEqual(task1);
        expect(completedTasks).toHaveLength(1);
    })

    it('should get pending tasks', () => {
        const manager = new TaskManager<Task>();
        const task1: Task = { id: 1, title: 'Test Task 1', completed: false };
        const task2: Task = { id: 2, title: 'Test Task 2', completed: true }

        manager.addTask(task1);
        manager.addTask(task2);
        const pendingTasks = manager.getPendingTasks();

        expect(pendingTasks).toContainEqual(task1);
        expect(pendingTasks).not.toContainEqual(task2);
        expect(pendingTasks).toHaveLength(1);
    })
})