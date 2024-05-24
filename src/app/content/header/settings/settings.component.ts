import { Component, inject, OnInit } from '@angular/core';
import { MenuModule } from "primeng/menu";
import { MenuItem, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../../service/auth.service";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ApiKey } from "../../../shared/patterns";
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-header-settings',
  standalone: true,
  imports: [
    MenuModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  providers: [MessageService]
})
export class HeaderSettingsComponent implements OnInit {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  protected menuItems?: MenuItem[];
  protected showDialog = false;

  protected editForm =  new FormGroup({
    apiKey: new FormControl('', [Validators.required, Validators.pattern(ApiKey)])
  });

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Einstellungen',
        items: [
          {
            label: 'API Key ändern',
            icon: 'pi pi-pencil',
            command: () => {
              this.showDialog = true;
            }
          },
          {
            label: 'Abmelden',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            }
          },
        ]
      }
    ];
  }

  protected logout() {
    this.authService.logout();
  }

  protected saveApiKey() {
    if (this.editForm.invalid) {
      return;
    }

    this.showDialog = false;

    const apiKey = this.editForm.controls.apiKey.value ?? '';

    this.authService.login(apiKey).then(() => {
      this.editForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'API Key wurde erfolgreich geändert' });
    }).catch(() => {
      this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Bei der Änderung des API Keys ist ein Fehler aufgetreten' });
    });
  }

  get formErrorMessage(): string {
    let errorMsg = '';
    const apiKeyFormControl = this.editForm.controls.apiKey;

    if (apiKeyFormControl.hasError('required')) {
      errorMsg = 'Die Eingabe eines gültigen API Keys ist notwendig';
    }

    if (apiKeyFormControl.hasError('pattern')) {
      errorMsg = 'Der eingegebene API Key entspricht nicht dem Base64-Format';
    }

    return errorMsg;
  }
}
