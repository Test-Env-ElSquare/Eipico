import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Permission } from '../models/permission';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly granted = new Set<Permission>();
  private readonly subject = new BehaviorSubject<Set<Permission>>(new Set());
  changes$ = this.subject.asObservable();

  initFromClaims(claims: Record<string, any> | null | undefined): void {
    this.granted.clear();
    if (!claims) {
      this.subject.next(new Set(this.granted));
      return;
    }
    const hasAll =
      claims['HasAccessToEverything'] === 'true' ||
      claims['HasAccessToEverything'] === true;
    for (const key of Object.values(Permission)) {
      if (key === Permission.Everything) {
        continue;
      }
      const claimKey = `HasAccessTo${key}`;
      const raw = claims[claimKey];
      const allowed = hasAll || raw === 'true' || raw === true;
      if (allowed) {
        this.granted.add(key as Permission);
      }
    }
    if (hasAll) {
      this.granted.add(Permission.Everything);
    }
    this.subject.next(new Set(this.granted));
  }

  has(permission: Permission): boolean {
    return (
      this.granted.has(permission) || this.granted.has(Permission.Everything)
    );
  }

  hasAny(permissions: Permission[]): boolean {
    return permissions.some((p) => this.has(p));
  }

  hasAll(permissions: Permission[]): boolean {
    return permissions.every((p) => this.has(p));
  }
}
