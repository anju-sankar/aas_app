@extends('superadmin.layout')

@section('content')
<h2>Tenants</h2>
<a href="{{ route('superadmin.tenants.create') }}" class="btn btn-primary mb-3">+ Add Tenant</a>

<table class="table table-bordered">
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Domain</th>
            <th>Admin Email</th>
            <th>Created At</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($tenants as $tenant)
            <tr>
                <td>{{ $tenant->id }}</td>
                <td>{{ $tenant->name }}</td>
                <td>{{ $tenant->domain }}</td>
                <td>{{ $tenant->admin_email }}</td>
                <td>{{ $tenant->created_at->format('d M Y') }}</td>
                <td>
                    <a href="{{ route('superadmin.tenants.show', $tenant->id) }}" class="btn btn-info btn-sm">View</a>
                    <a href="{{ route('superadmin.tenants.edit', $tenant->id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('superadmin.tenants.destroy', $tenant->id) }}" method="POST" style="display:inline;">
                        @csrf @method('DELETE')
                        <button class="btn btn-danger btn-sm" onclick="return confirm('Delete this tenant?')">Delete</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
@endsection
