@extends('superadmin.layout')

@section('content')
<h2>Add New Tenant</h2>

<form method="POST" action="{{ route('superadmin.tenants.store') }}">
    @csrf
    <div class="mb-3">
        <label>Tenant Name</label>
        <input type="text" name="name" class="form-control" required>
    </div>

    <div class="mb-3">
        <label>Domain (e.g. tenant1.aasp.strangled.net)</label>
        <input type="text" name="domain" class="form-control" required>
    </div>

    <div class="mb-3">
        <label>Admin Name</label>
        <input type="text" name="admin_name" class="form-control" required>
    </div>

    <div class="mb-3">
        <label>Admin Email</label>
        <input type="email" name="admin_email" class="form-control" required>
    </div>

    <div class="mb-3">
        <label>Admin Password</label>
        <input type="password" name="admin_password" class="form-control" required>
    </div>

    <button class="btn btn-success">Create Tenant</button>
</form>
@endsection
