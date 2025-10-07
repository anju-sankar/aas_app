@extends('superadmin.layout')

@section('content')
<div class="row mb-4">
    <div class="col-md-4">
        <div class="card text-bg-primary mb-3">
            <div class="card-body text-center">
                <h3>{{ $tenantCount }}</h3>
                <p class="mb-0">Total Tenants</p>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card text-bg-success mb-3">
            <div class="card-body text-center">
                <h3>{{ $userCount }}</h3>
                <p class="mb-0">Total Users</p>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card text-bg-warning mb-3">
            <div class="card-body text-center">
                <h3>{{ $tenantAdminCount }}</h3>
                <p class="mb-0">Tenant Admins</p>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <h5 class="mb-0">Recent Tenants</h5>
    </div>
    <div class="card-body p-0">
        <table class="table table-striped mb-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Domain</th>
                    <th>Admin Email</th>
                    <th>Created</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @foreach ($recentTenants as $tenant)
                    <tr>
                        <td>{{ $tenant->name }}</td>
                        <td>{{ $tenant->domain }}</td>
                        <td>{{ $tenant->admin_email }}</td>
                        <td>{{ $tenant->created_at->diffForHumans() }}</td>
                        <td>
                            <a href="{{ route('superadmin.tenants.show', $tenant->id) }}" class="btn btn-sm btn-outline-primary">View</a>
                        </td>
                    </tr>
                @endforeach
                @if($recentTenants->isEmpty())
                    <tr><td colspan="5" class="text-center text-muted">No tenants yet.</td></tr>
                @endif
            </tbody>
        </table>
    </div>
</div>
@endsection
