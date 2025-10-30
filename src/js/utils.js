

export function createNewTask() {
    const formData = new FormData(document.getElementById('newTaskForm'));
    const taskData = {
        name: formData.get('taskName'),
        responsible: formData.get('responsible'),
        project: formData.get('projectName'),
        description: formData.get('description'),
        dueDate: formData.get('dueDate'),
        priority: formData.get('priority'),
        status: formData.get('status'),
        createdAt: new Date().toISOString()
    };

    // Aqui você pode implementar a lógica para salvar a tarefa
    console.log('Nova tarefa criada:', taskData);

    // Exemplo de feedback para o usuário
    alert('Tarefa criada com sucesso!');

    // Redirecionar para o dashboard
    window.location.href = 'dashboard.html';
}

export function cancelTask() {
    if (confirm('Tem certeza que deseja cancelar? As alterações serão perdidas.')) {
        window.location.href = 'dashboard.html';
    }
}